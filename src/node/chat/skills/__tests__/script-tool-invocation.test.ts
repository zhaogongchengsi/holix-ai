import { describe, expect, it, vi } from 'vitest'
import { scriptToTool } from '../adapters/command'

vi.mock('../../../platform/logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}))

vi.mock('../../../database/skill-config', () => ({
  getSkillConfig: vi.fn(() => ({})),
}))

describe('skills script tool invocation', () => {
  it('can invoke script tool declaration successfully', async () => {
    const tool = scriptToTool(
      {
        type: 'script',
        name: 'script_echo',
        description: 'echo topic',
        script: 'node -e "console.log(\'skill-script:\' + \'{{topic}}\')"',
        schema: {
          topic: { type: 'string', description: 'topic' },
        },
      },
      process.cwd(),
      'script-skill',
    )

    const output = await tool.invoke({ topic: 'toolchain' })

    expect(output).toContain('skill-script:toolchain')
  })
})
