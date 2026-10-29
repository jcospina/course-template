import { MDXProvider } from "@mdx-js/react";
import {
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { Pre } from "../ui/CodeBlock";
import Callout from "../ui/Callout";
import Predict from "../ui/Predict";
import Quiz from "../ui/Quiz";
import Exercise from "../ui/Exercise";
import CodeExercise from "../ui/CodeExercise";
import KeyTakeaways from "../ui/KeyTakeaways";
import Figure from "../ui/Figure";
import Playground from "../ui/Playground";

/** Opening paragraph of a lesson — larger, serif, sets the scene. */
function Lead({ children }: { children: ReactNode }) {
  return <p className="lede">{children}</p>;
}

/** A defined term with a subtle underline. */
function Term({ children }: { children: ReactNode }) {
  return <span className="term">{children}</span>;
}

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textFromNode).join("");
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textFromNode(node.props.children);
  }
  return "";
}

function readsLikeSnippet(code: string): boolean {
  return (
    code.length >= 72 &&
    /[;{}]|\b(if|for|while|const|let|function|return)\b/.test(code)
  );
}

function Code({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  const raw = textFromNode(children);
  const flow = !className && readsLikeSnippet(raw);
  return (
    <code
      className={[className, flow ? "code--flow" : ""].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </code>
  );
}

/** Internal/external aware anchor. */
function SmartLink(props: { href?: string; children?: ReactNode }) {
  const href = props.href ?? "";
  if (href.startsWith("/")) {
    return <Link to={href}>{props.children}</Link>;
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {props.children}
    </a>
  );
}

export const mdxComponents = {
  pre: Pre,
  code: Code,
  a: SmartLink,
  Callout,
  Predict,
  Quiz,
  Exercise,
  CodeExercise,
  KeyTakeaways,
  Figure,
  Playground,
  Lead,
  Term,
};

export function MDXScope({ children }: { children: ReactNode }) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
