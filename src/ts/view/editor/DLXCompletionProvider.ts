/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import { OPCODES } from "../../model/processor/operations/Opcodes";

export class DLXCompletionProvider implements monaco.languages.CompletionItemProvider {
	public provideCompletionItems(): monaco.languages.CompletionList {
		return {
			suggestions: Object.keys(OPCODES)
				.map(opc => <monaco.languages.CompletionItem> {
					label: opc,
					kind: monaco.languages.CompletionItemKind.Keyword,
					insertText: opc,
					documentation: OPCODES[opc].map(op => op.describe()).reduce((a, b) => a + "\n" + b, "")
				})
		};
	}
}
