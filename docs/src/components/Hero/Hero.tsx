import { FC } from 'react'
import { notify, NotifyAlignment } from 'react-simple-notify'
import styles from './Hero.module.scss'
import packageJson from '../../../../package.json'

export const Hero: FC = () => {
  const showDemoNotification = () => {
    notify.open({
      alignment: NotifyAlignment.topRight,
      duration: 4000,
      pauseOnHover: true,
      render: ({ onClose }) => (
        <div className={styles.demoNotify}>
          <div className={styles.demoNotifyIcon}>✨</div>
          <div className={styles.demoNotifyContent}>
            <h4>Welcome to React Simple Notify!</h4>
            <p>Lightweight, performant, and beautiful notifications</p>
          </div>
          <button onClick={onClose} className={styles.demoNotifyClose}>
            ✕
          </button>
        </div>
      ),
    })
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
        <div className={styles.gradient3}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.badges}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            v{packageJson.version}
          </div>
          <a
            href="https://github.com/GruFFix/react-simple-notify"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubBadge}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            <span>Star on GitHub</span>
          </a>
        </div>

        <h1 className={styles.title}>
          React Simple Notify
          <span className={styles.titleGradient}>
            Beautiful Notifications Made Simple
          </span>
        </h1>

        <p className={styles.subtitle}>
          A lightweight, performant notification library for React.
          <br />
          TypeScript-first, SSR-compatible, and fully customizable.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>~5.6 KB</div>
            <div className={styles.statLabel}>Gzipped</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>Zero</div>
            <div className={styles.statLabel}>Dependencies</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>100%</div>
            <div className={styles.statLabel}>TypeScript</div>
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={showDemoNotification} className={styles.primaryBtn}>
            <span>Try Live Demo</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16666 10H15.8333M15.8333 10L10 4.16666M15.8333 10L10 15.8333"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <a
            href="https://github.com/GruFFix/react-simple-notify"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.165 20 14.418 20 10c0-5.523-4.477-10-10-10z"
              />
            </svg>
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}
