import styles from './Topbar.module.css';

interface TopbarProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

export default function Topbar({ title, subtitle, rightContent }: TopbarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>
      {rightContent && <div className={styles.right}>{rightContent}</div>}
    </header>
  );
}
