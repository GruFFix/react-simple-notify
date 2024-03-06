import { FC } from 'react'

import '../../shared/styles/codeBlock.css'

export const Code: FC<{ code: string; language?: string }> = ({
  code,
  language = 'js',
}) => {
  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}
