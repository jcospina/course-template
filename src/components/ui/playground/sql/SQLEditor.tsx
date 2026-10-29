import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
const highlight = HighlightStyle.define([{tag:tags.keyword,color:"var(--sql-keyword)"},{tag:tags.string,color:"var(--sql-string)"},{tag:tags.number,color:"var(--sql-number)"},{tag:tags.comment,color:"var(--ink-soft)",fontStyle:"italic"}]);
import { sql, PostgreSQL } from "@codemirror/lang-sql";
export default function SQLEditor({code,onChange,readOnly}: {code:string;onChange:(code:string)=>void;readOnly:boolean}) {
 const container = useRef<HTMLDivElement>(null);
 const view = useRef<EditorView>(); const changed = useRef(onChange); changed.current=onChange;
 useEffect(() => {
 const editor = new EditorView({parent:container.current!,state:EditorState.create({doc:code,extensions:[lineNumbers(),history(),drawSelection(),highlightActiveLine(),syntaxHighlighting(highlight),sql({dialect:PostgreSQL}),keymap.of([...defaultKeymap,...historyKeymap,{key:"Escape",run:v=>{v.contentDOM.blur();return true;}}]),EditorState.readOnly.of(readOnly),EditorView.lineWrapping,EditorView.contentAttributes.of({"aria-label":"SQL source"}),EditorView.theme({"&":{height:"var(--editor-height)",color:"var(--ink)",backgroundColor:"transparent"},".cm-scroller":{overflow:"auto",fontFamily:"monospace"},".cm-gutters":{backgroundColor:"transparent",color:"inherit"}}),EditorView.updateListener.of(update=>{if(update.docChanged)changed.current(update.state.doc.toString());})]})});
 view.current=editor; return()=>{editor.destroy();view.current=undefined;};
 },[readOnly]);
 useEffect(()=>{const editor=view.current;if(editor && editor.state.doc.toString()!==code) editor.dispatch({changes:{from:0,to:editor.state.doc.length,insert:code}});},[code]);
 return <div ref={container} className="sql-editor"/>;
}
