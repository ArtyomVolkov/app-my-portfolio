import Divider from '@shared/components/ui-kit/divider';
import Section from '@shared/components/section';
import Typography from '@shared/components/ui-kit/typography';
import Input from '@shared/components/ui-kit/input';

import styles from './style.module.scss';

const InputsTab = () => {
  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Input Field</h2>
      <p className={styles.subtitle}>
        Input components allow users to enter and edit data within forms.
      </p>
      <div className={styles.examples}>
        <Section title="Input variants">
          <article className={styles.article}>
            <Divider title="Dimension" align="left" />
            <Typography variant="h6" className={styles.description}>
              fullWidth: true, label: provided.
            </Typography>
            <div className={styles.grid}>
              <Input
                type="text"
                label="Small"
                fullWidth
                placeholder="Small input"
                dimension="small"
              />
              <Input
                type="text"
                label="Medium"
                fullWidth
                placeholder="Medium input"
                dimension="medium"
              />
              <Input
                type="text"
                label="Large"
                fullWidth
                placeholder="Large input"
                dimension="large"
              />
            </div>
            <Divider title="Icons" align="left" />
            <Typography variant="h6" className={styles.description}>
              fullWidth: false, dimension: default, no Label.
            </Typography>
            <div className={styles.row}>
              <Input
                type="text"
                placeholder="Start icon"
                dimension="medium"
                startIcon="🔍"
              />
              <Input
                type="text"
                placeholder="End icon"
                dimension="medium"
                endIcon="✅"
              />
              <Input
                type="text"
                placeholder="Two icons"
                startIcon="⚡"
                endIcon="🌟"
              />
            </div>
            <Divider title="Validation" align="left" />
            <Typography variant="h6">
              fullWidth: true, dimension: default, error: true.
            </Typography>
            <div className={styles.grid}>
              <Input
                error
                label="Error state"
                fullWidth
                placeholder="Error state"
              />
              <Input
                error
                label="Error state"
                hint="Error message"
                fullWidth
                value="Invalid input"
                placeholder="Error state"
              />
            </div>
            <Typography variant="h6">
              fullWidth: true, dimension: default, color: warning.
            </Typography>
            <div className={styles.grid}>
              <Input
                color="warning"
                label="Warning state"
                fullWidth
                placeholder="Warning state"
              />
              <Input
                color="warning"
                label="Warning state"
                hint="Warning message"
                fullWidth
                value="Warning input"
                placeholder="Warning state"
              />
            </div>
            <Typography variant="h6">
              fullWidth: true, dimension: default, color: success.
            </Typography>
            <div className={styles.grid}>
              <Input
                color="success"
                label="Success state"
                fullWidth
                placeholder="Success state"
              />
              <Input
                color="success"
                label="Success state"
                hint="Success message"
                fullWidth
                value="Success input"
                placeholder="Success state"
              />
            </div>
            <Divider title="Email" align="left" />
            <Typography variant="h6">
              fullWidth: true, dimension: default, type: email.
            </Typography>
            <div className={styles.grid}>
              <Input
                type="email"
                fullWidth
                label="Email"
                placeholder="Enter your email"
              />
              <Input
                type="email"
                fullWidth
                label="Email with value"
                value="user@example.com"
                hint="We'll never share your email."
                placeholder="Enter your email"
              />
            </div>
            <Divider title="Password" align="left" />
            <Typography variant="h6">
              fullWidth: true, dimension: default, type: password.
            </Typography>
            <div className={styles.grid}>
              <Input
                type="password"
                fullWidth
                label="Password"
                placeholder="Enter your password"
              />
              <Input
                type="password"
                fullWidth
                label="Password with value"
                value="mypassword123"
                hint="Make sure your password is strong."
                placeholder="Enter your password"
              />
            </div>
            <Divider title="Number" align="left" />
            <Typography variant="h6">
              fullWidth: true, dimension: default, type: number.
            </Typography>
            <div className={styles.grid}>
              <Input
                type="number"
                fullWidth
                label="Age"
                placeholder="Enter your age"
              />
              <Input
                type="number"
                fullWidth
                label="Quantity with value"
                value="10"
                hint="Available stock: 50"
                placeholder="Enter quantity"
              />
            </div>
            <Divider title="Textarea" align="left" />
            <Typography variant="h6">
              fullWidth: true, dimension: default, type: text, resize: varies.
            </Typography>
            <div className={styles.grid}>
              <Input
                type="text"
                fullWidth
                label="Textarea (4 rows)"
                value={`This is a multiline input field.\nYou can enter multiple lines of text here.\nYou can change resize behavior.\n`}
                placeholder="Enter your message"
                multiline
                rows={4}
                maxLength={200}
                resize
              />
              <Input
                type="text"
                fullWidth
                label="Textarea (3 rows)"
                value={`This is a multiline input field.\nYou can enter multiple lines of text here.`}
                placeholder="Enter your message"
                hint="Max 200 characters."
                maxLength={200}
                multiline
                rows={3}
              />
            </div>
          </article>
        </Section>
      </div>
    </div>
  );
};

export default InputsTab;
