import Divider from '@shared/components/ui-kit/divider';
import Button from '@shared/components/ui-kit/button';
import Section from '@shared/components/section';
import Typography from '@shared/components/ui-kit/typography';
import snackbar from '@shared/components/ui-kit/snackbar';

import type { SnackbarData } from '@shared/components/ui-kit/snackbar/provider';

import styles from './style.module.scss';

const SnackOptions = {
  layout: {
    props: {
      autoHide: false,
      color: 'default',
    },
    settings: {
      stackLimit: 1,
    },
  },
  stack: {
    props: {
      autoHide: true,
      duration: 3000,
      color: 'default',
    },
    settings: {
      position: 'bottom-center',
      stackLimit: 5,
    },
  },
  colors: {
    props: {
      autoHide: true,
      duration: 3000,
    },
    settings: {
      position: 'top-center',
      stackLimit: 1,
    },
  },
  custom: {
    props: {
      autoHide: false,
      color: 'default',
    },
    settings: {
      position: 'bottom-center',
      stackLimit: 1,
    },
  },
};

const SnackbarTab = () => {
  const openSnackbar = (
    props: Record<string, any>,
    settings: Record<string, any>
  ) => {
    const id = (Math.random() * 1000).toFixed(0);

    snackbar.open(
      {
        message: `This is a snackbar message! ID: ${id}`,
        ...props,
      } as SnackbarData,
      settings
    );
  };

  const openCustomSnackbar = (
    props: Record<string, any>,
    settings: Record<string, any>
  ) => {
    snackbar.open(
      {
        message: (
          <div>
            <Typography>Custom Content</Typography>
            <Typography variant="p" lineBreak>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </div>
        ),
        classes: {
          root: styles.customSnackbarRoot,
          message: styles.customSnackbarMessage,
        },
        ...props,
      } as SnackbarData,
      settings
    );
  };

  const renderOptions = (options: Record<string, any>) => {
    return Object.entries(options)
      .map(([key, value]) => {
        if (key === 'message') {
          return `${key}: ${typeof value}`;
        }
        return `${key}: ${String(value)}`;
      })
      .join(', ');
  };

  const closeSnackbar = () => {
    snackbar.close();
  };

  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Snackbar</h2>
      <p className={styles.subtitle}>
        A snackbar is a brief message that appears at the bottom of the screen
        to inform users about an action or event.
      </p>
      <div className={styles.examples}>
        <Section title="Snackbar Variants">
          <article className={styles.article}>
            <Divider title="Layout" align="left" />
            <Typography variant="h6" lineBreak>
              {renderOptions({
                ...SnackOptions.layout.props,
                ...SnackOptions.layout.settings,
                position: 'varies',
              })}
            </Typography>
            <div className={styles.row}>
              {[
                'top-left',
                'top-center',
                'top-right',
                'bottom-left',
                'bottom-center',
                'bottom-right',
              ].map((position) => (
                <Button
                  key={position}
                  variant="outlined"
                  onClick={() => {
                    openSnackbar(
                      { ...SnackOptions.layout.props },
                      {
                        ...SnackOptions.layout.settings,
                        position,
                      }
                    );
                  }}
                >
                  {position
                    .replace('-', ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Button>
              ))}
            </div>
            <Divider
              title={`Stack (${SnackOptions.stack.settings.stackLimit} tiles)`}
              align="left"
            />
            <Typography variant="h6" lineBreak>
              {renderOptions({
                ...SnackOptions.stack.props,
                ...SnackOptions.stack.settings,
              })}
            </Typography>
            <div className={styles.row}>
              <Button variant="dashed" color="default" onClick={closeSnackbar}>
                Pop
              </Button>
              <Button
                variant="dashed"
                color="primary"
                onClick={() => {
                  openSnackbar(
                    SnackOptions.stack.props,
                    SnackOptions.stack.settings
                  );
                }}
              >
                Push
              </Button>
            </div>
            <Divider title="Colors" align="left" />
            <Typography variant="h6" lineBreak>
              {renderOptions({
                ...SnackOptions.colors.props,
                ...SnackOptions.colors.settings,
                color: 'varies',
              })}
            </Typography>
            <div className={styles.row}>
              {['default', 'success', 'danger', 'warning', 'info'].map(
                (color) => (
                  <Button
                    key={color}
                    variant="solid"
                    color={color as any}
                    onClick={() => {
                      openSnackbar(
                        {
                          ...SnackOptions.colors.props,
                          color,
                        },
                        SnackOptions.colors.settings
                      );
                    }}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </Button>
                )
              )}
            </div>
            <Divider title="Custom" align="left" />
            <Typography variant="h6" lineBreak>
              {renderOptions({
                ...SnackOptions.custom.props,
                ...SnackOptions.custom.settings,
              })}
            </Typography>
            <div className={styles.row}>
              <Button variant="outlined" onClick={closeSnackbar}>
                Close Snackbar
              </Button>
              <Button
                variant="solid"
                color="primary"
                onClick={() =>
                  openCustomSnackbar(
                    SnackOptions.custom.props,
                    SnackOptions.custom.settings
                  )
                }
              >
                Show Snackbar
              </Button>
            </div>
          </article>
        </Section>
      </div>
    </div>
  );
};

export default SnackbarTab;
