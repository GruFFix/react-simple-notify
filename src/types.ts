import { createContext, ReactNode } from 'react'

export enum NotifyAlignment {
    topLeft = 'top-left',
    topRight = 'top-right',
    bottomLeft = 'bottom-left',
    bottomRight = 'bottom-right',
    topCenter = 'top-center',
    bottomCenter = 'bottom-center',
}

export interface BaseNotifyOptions {
    duration: number
    alignment: NotifyAlignment
    render: ({ id }: { id: string }) => JSX.Element
}

export interface NotifyOptions extends BaseNotifyOptions {
    id: string
}

export interface NotifyContextType {
    openNotify: (options: Omit<NotifyOptions, 'id'>) => void
    closeNotify: (id: string) => void
    closeAllNotify: () => void
}

export const NotifyContext = createContext<
    NotifyContextType | undefined
>(undefined)

export interface NotifyProviderProps {
    children: ReactNode
}

export interface NotifyProps extends BaseNotifyOptions {
    id: string
}

export type GroupedNotify = {
    [key in NotifyAlignment]: NotifyOptions[]
}
