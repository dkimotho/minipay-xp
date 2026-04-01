import React from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class AppErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('App crash:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '2rem',
            color: '#fff',
            textAlign: 'center',
            backgroundColor: '#0A0A0A',
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p style={{ fontSize: '18px', marginBottom: '1rem' }}>
            Something went wrong.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#35D07F',
              color: '#0A0A0A',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Refresh App
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
