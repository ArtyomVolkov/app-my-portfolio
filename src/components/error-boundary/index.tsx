import React from "react";

import Main from "@components/main";
import ScrollView from "@shared/components/ui-kit/scroll-view";
import Typography from "@shared/components/ui-kit/typography";
import Button from "@shared/components/ui-kit/button";
import Divider from "@shared/components/ui-kit/divider";

import styles from "./style.module.scss";

interface ErrorBoundaryProps {
  children: React.ReactNode | React.ReactNode[];
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
  code?: string | number;
  stack?: string;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false, message: "" };
  }

  componentDidCatch(error: Error) {
    this.setState({
      hasError: true,
      message: error.message || "An unexpected error occurred.",
      code: (error as { code?: string | number }).code,
      stack: error.stack,
    });
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <Main className={styles.errorBoundary}>
        <Typography variant="h3" className={styles.title}>
          Something went wrong.
        </Typography>
        {this.state.code && (
          <Typography
            variant="h4"
            className={styles.errorCode}
          >{`Code: ${this.state.code}`}</Typography>
        )}
        <Typography variant="h5" className={styles.errorMessage}>
          {`Message: ${this.state.message}`}
        </Typography>
        {this.state.stack && (
          <>
            <Divider title="Stack Trace" align="left" />
            <pre>
              <ScrollView classes={{ root: styles.stackTrace }}>
                {this.state.stack}
              </ScrollView>
            </pre>
          </>
        )}
      </Main>
    );
  }
}

export default ErrorBoundary;
