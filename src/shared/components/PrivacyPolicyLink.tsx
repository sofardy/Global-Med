import Link from "next/link";
import React from "react";

interface PrivacyPolicyLinkProps {
  text: string;
  className?: string;
}

const PrivacyPolicyLink: React.FC<PrivacyPolicyLinkProps> = ({
  text,
  className = "text-light-accent hover:underline ml-1",
}) => {
  // Find the first keyword occurrence
  const match = text.match(/(политикой|siyosatiga|policy)/i);
  if (!match) return <span>{text}</span>;
  const keyword = match[0];
  const index = text.indexOf(keyword);
  const before = text.slice(0, index);
  const after = text.slice(index + keyword.length);
  return (
    <>
      {before}
      <Link
        href="/privacy-policy"
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {keyword}
      </Link>
      {after}
    </>
  );
};

export default PrivacyPolicyLink;
