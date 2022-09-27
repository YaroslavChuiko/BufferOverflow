import { Button, Card, Page, Text } from '@geist-ui/core';
import PageContent from '@geist-ui/core/esm/page/page-content';
// import '../../styles/index.scss';
import s from './Home.module.scss';

const Home = () => {
  return (
    <Page dotBackdrop={true}>
    {/* <Page.Content> */}

     <Card  hoverable={false} className={s.container}>
        <Text h1>Home Page</Text>
        <Button>Submit</Button>
     </Card>
    {/* </Page.Content> */}
    </Page>
  );
};

export default Home;
