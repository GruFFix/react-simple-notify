import { FC, PropsWithChildren, useRef } from 'react'

import {NotifyAlignment} from "../types.ts";
import {useNotificationAnimations} from "../hooks/useAnimatedElement.ts";

interface NotifyContainerProps {
  alignment: NotifyAlignment
}

import '../styles.css'

export const NotifyContainer: FC<PropsWithChildren<NotifyContainerProps>> = ({
  alignment,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { isRendered } = useNotificationAnimations(containerRef, alignment)

  const containerClassName = `react-notify-container ${alignment}`;

  return (
    <div
     className={containerClassName}
      ref={containerRef}
      key={alignment}
    >
      {isRendered && children}
    </div>
  )
}
