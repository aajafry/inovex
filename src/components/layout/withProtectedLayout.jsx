import Layout from "./Layout";
import ProtectedLayout from "./ProtectedLayout";

function withProtectedLayout(Component) {
  return (
    <ProtectedLayout>
      <Layout>
        <Component />
      </Layout>
    </ProtectedLayout>
  );
}

export { withProtectedLayout };
