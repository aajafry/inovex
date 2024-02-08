import Protected from "./Protected";

function withProtected(Component) {
  return (
    <Protected>
      <Component />
    </Protected>
  );
}

export { withProtected };

