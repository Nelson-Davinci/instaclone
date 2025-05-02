

export default function Container({ children, classname }) {
  return <div className={`py-5 lg:px-8 mx-auto ${classname}`}>{children}</div>;
}
