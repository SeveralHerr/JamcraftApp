import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          maxWidth: 560,
          margin: '80px auto',
          padding: '0 24px',
          textAlign: 'center',
        }}>
          <h1 style={{ fontFamily: "'Fraunces', serif", marginBottom: 16 }}>
            Oops! Something went wrong
          </h1>
          <p style={{ color: 'var(--fg-dim, rgba(232,230,225,.65))', marginBottom: 16 }}>
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          {this.state.error && (
            <p style={{
              fontSize: 13,
              color: 'var(--accent)',
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 24,
            }}>
              {this.state.error.message}
            </p>
          )}
          <button
            onClick={this.handleReset}
            style={{
              padding: '12px 24px',
              background: 'var(--accent, #f59e0b)',
              color: 'var(--bg)',
              border: 'none',
              fontFamily: 'inherit',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
