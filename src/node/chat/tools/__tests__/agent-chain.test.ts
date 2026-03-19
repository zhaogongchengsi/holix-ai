import { AIMessage, ToolMessage } from '@langchain/core/messages'
import { describe, expect, it, vi } from 'vitest'
import { FakeToolCallingModel, createAgent } from 'langchain'
import { systemTimeTool } from '../builtin/system'
import { buildLoadSkillTool } from '../../skills/tools'

const mockSkillManager = vi.hoisted(() => ({
  listSkills: vi.fn(() => [
    { name: 'code_assistant', description: 'Assist with code', prompt: 'Use strict TypeScript.' },
  ]),
  getSkill: vi.fn((name: string) => (name === 'code_assistant'
    ? { name: 'code_assistant', description: 'Assist with code', prompt: 'Use strict TypeScript.' }
    : undefined)),
}))

vi.mock('../../skills/manager', () => ({
  skillManager: mockSkillManager,
}))

vi.mock('../../../platform/logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}))

describe('AI full-chain tool calling (LangChain agent)', () => {
  it('executes built-in system_time tool end-to-end', async () => {
    const model = new FakeToolCallingModel({
      toolCalls: [[{ name: 'system_time', args: {}, id: 'time_1' }], []],
    })

    const agent = createAgent({
      model,
      tools: [systemTimeTool],
    })

    const response = await agent.invoke({
      messages: [{ role: 'user', content: '现在时间是什么？' }],
    })

    const messages = response.messages
    expect(messages.some(msg => msg.getType() === 'tool')).toBe(true)

    const toolMessage = messages.find(msg => msg.getType() === 'tool') as ToolMessage
    expect(toolMessage.name).toBe('system_time')
    expect(String(toolMessage.content)).toContain('timestamp')

    const finalMessage = messages[messages.length - 1] as AIMessage
    expect(finalMessage.tool_calls).toEqual([])
  })

  it('executes progressive disclosure via load_skill tool end-to-end', async () => {
    const loadSkillTool = buildLoadSkillTool()
    const model = new FakeToolCallingModel({
      toolCalls: [[{ name: 'load_skill', args: { skillName: 'code_assistant' }, id: 'skill_1' }], []],
    })

    const agent = createAgent({
      model,
      tools: [loadSkillTool],
    })

    const response = await agent.invoke({
      messages: [{ role: 'user', content: '请加载代码助手 skill' }],
    })

    const toolMessage = response.messages.find(msg => msg.getType() === 'tool') as ToolMessage
    expect(toolMessage.name).toBe('load_skill')
    expect(String(toolMessage.content)).toContain('Use strict TypeScript.')
    expect(mockSkillManager.getSkill).toHaveBeenCalledWith('code_assistant')
  })
})
