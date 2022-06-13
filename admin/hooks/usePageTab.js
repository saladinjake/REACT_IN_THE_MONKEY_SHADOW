import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Link } from "components/lib";

const usePageTab = (tabs) => {
  const router = useRouter();

  const [index, setIndex] = useState();

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.heading === router.query.tab);

    setIndex(index === -1 ? 0 : index);
  }, [router.query.tab]);

  const renderHeaderControl = ({ tab, href = `?tab=${tab.heading}`, as }) => {
    return (
      <Link mute href={href} as={as}>
        {tab.heading}
      </Link>
    );
  };

  return { index, renderHeaderControl };
};

export default usePageTab;
