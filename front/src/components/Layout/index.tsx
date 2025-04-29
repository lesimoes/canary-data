import Header from '../Header';
import Footer from '../Footer';
import { ContentContainer, MainContainer } from './styles';

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <MainContainer>
      <Header />
      <ContentContainer>{props.children}</ContentContainer>
      <Footer />
    </MainContainer>
  );
}

export default Layout;
