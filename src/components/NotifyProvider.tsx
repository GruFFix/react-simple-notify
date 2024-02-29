import React, { memo } from 'react'
import { createPortal } from 'react-dom'

import { NotifyContainer } from "./NotifyContainer.tsx";
import { Notify } from "./Notify.tsx";

import { useNotifyManager } from "../hooks/useNotifyManager.ts";

import {NotifyProviderProps, NotifyAlignment, NotifyContext} from "../types.ts";

export const NotifyProvider: React.FC<NotifyProviderProps> = memo(
  ({ children }) => {
    const {
      notifyGrouped,
      openNotify,
      closeNotify,
      closeAllNotify,
      containers,
    } = useNotifyManager()

    return (
      <NotifyContext.Provider
        value={{ openNotify, closeNotify, closeAllNotify }}
      >
        {children}

        {containers.map((i) =>
          createPortal(
            <NotifyContainer key={i} alignment={i as NotifyAlignment}>
              {notifyGrouped?.[i]?.map((notify) => (
                <Notify key={notify.id} {...notify} />
              ))}
            </NotifyContainer>,
            document.body,
          ),
        )}
      </NotifyContext.Provider>
    )
  },
)
