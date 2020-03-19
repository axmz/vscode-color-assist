export function setCommentLineSymbol(languageCode: string): string {
  switch (languageCode) {
    case "asciidoc":
    case "apex":
    case "javascript":
    case "javascriptreact":
    case "typescript":
    case "typescriptreact":
    case "al":
    case "c":
    case "cpp":
    case "csharp":
    case "dart":
    case "flax":
    case "fsharp":
    case "go":
    case "groovy":
    case "haxe":
    case "java":
    case "jsonc":
    case "kotlin":
    case "less":
    case "pascal":
    case "objectpascal":
    case "php":
    case "rust":
    case "scala":
    case "scss":
    case "stylus":
    case "swift":
    case "verilog":
    case "vue":
      return "//";

    case "css":
      return "/*";

    case "coffeescript":
    case "dockerfile":
    case "gdscript":
    case "graphql":
    case "julia":
    case "makefile":
    case "perl":
    case "perl6":
    case "puppet":
    case "r":
    case "ruby":
    case "shellscript":
    case "tcl":
    case "yaml":
    case "tcl":
    case "elixir":
    case "python":
    case "nim":
    case "powershell":
    case "terraform":
      return "#";

    case "ada":
    case "hive-sql":
    case "pig":
    case "plsql":
    case "sql":
    case "lua":
    case "elm":
    case "haskell":
      return "--";

    case "vb":
    case "diagram":
      return "'";

    case "bibtex":
    case "erlang":
    case "latex":
    case "matlab":
      return "%";

    case "clojure":
    case "racket":
    case "lisp":
      return ";";

    case "fortran-modern":
      return "c";

    case "SAS":
    case "stata":
      return "*";

    case "html":
    case "markdown":
      return "<!--";

    case "twig":
      return "{#";

    case "genstat":
      return "\\";

    case "cfml":
      return "<!---";

    default:
      return "//";
  }
}
