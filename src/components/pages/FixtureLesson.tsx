import { lazy, Suspense, type ComponentType } from "react";
import { useParams } from "react-router-dom";
import { MDXScope } from "../mdx/MDXComponents";
const files = import.meta.glob<{default:ComponentType}>("/tests/fixtures/lessons/*.mdx");
const lessons = Object.fromEntries(Object.entries(files).map(([path,loader])=>[path.split("/").pop()!.replace(".mdx",""),lazy(loader)]));
export default function FixtureLesson() {
 const {slug=""}=useParams();const Lesson=lessons[slug];
 return <article className="lesson"><div className="lesson__inner"><Suspense fallback={<p>Loading fixture…</p>}><MDXScope>{Lesson ? <Lesson/> : <p role="alert">Unknown fixture</p>}</MDXScope></Suspense></div></article>;
}
