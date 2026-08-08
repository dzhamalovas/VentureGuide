import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught Error in Component Tree:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl">
            <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold mb-2">Произошла ошибка при отображении</h2>
            <p className="text-sm text-slate-400 mb-6">
              Приложение столкнулось с неожиданным сбоем. Нажмите кнопку ниже для перезагрузки страницы.
            </p>
            <div className="bg-slate-900 text-rose-300 p-3 rounded text-xs font-mono mb-6 text-left overflow-auto max-h-32">
              {this.state.error?.toString() || 'Неизвестная ошибка'}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-colors"
            >
              Перезагрузить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
