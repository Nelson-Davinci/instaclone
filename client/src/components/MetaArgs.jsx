import { Helmet } from "react-helmet-async";

export default function MetaArgs({title, content}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
  );
}
