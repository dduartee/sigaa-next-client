import styles from "../styles/index/index.module.css";
import { ThemeChanger } from "../components/ThemeChanger";
import { FlexBody } from "@components/home/Flex";
import { Icon, Input, Card } from "semantic-ui-react";
export default function IndexPage() {
  return (
    <FlexBody>
      <Card>
        <Card.Content textAlign="center">
          <Card.Header>Gabriel</Card.Header>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Input
            icon
            iconPosition="left"
            fluid
            placeholder="Username "
            size="large"
            className={styles.customInput}
          >
            <input />
            <Icon name="user" />
          </Input>
          <Input
            icon
            iconPosition="left"
            fluid
            placeholder="Password "
            size="large"
            className={styles.customInput}
          >
            <input />
            <Icon name="lock" />
          </Input>
        </Card.Content>
      </Card>
    </FlexBody>
  );
}
