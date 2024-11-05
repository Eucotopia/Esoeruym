import { WebSocketStatus } from '@hocuspocus/provider'

export const getConnectionText = (collabState: WebSocketStatus) => {
  switch (collabState) {
    case WebSocketStatus.Connected:
      return `Connected`

    case WebSocketStatus.Connecting:
      return `Connecting...`

    case WebSocketStatus.Disconnected:
      return `Disconnected`

    default:
      return `Connecting...`
  }
}

export const getCollabStateColor = (collabState: WebSocketStatus) => {
  switch (collabState) {
    case WebSocketStatus.Connected:
      return `primary`

    case WebSocketStatus.Connecting:
      return `warning`

    case WebSocketStatus.Disconnected:
      return `danger`

    default:
      return `warning`
  }
}
