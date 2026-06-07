export function Input(props) {
  return <input className="input" {...props} />;
}

export function Textarea(props) {
  return <textarea className="input textarea" {...props} />;
}

export function Select({ children, ...props }) {
  return <select className="input" {...props}>{children}</select>;
}
