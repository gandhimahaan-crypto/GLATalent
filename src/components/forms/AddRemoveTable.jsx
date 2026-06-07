import { Button } from "../ui/Button";
import { Input, Textarea } from "../ui/Input";

export function AddRemoveTable({ title, rows, setRows, fields }) {
  const add = () => setRows([...rows, Object.fromEntries(fields.map((field) => [field, ""]))]);
  const update = (index, field, value) => setRows(rows.map((row, i) => i === index ? { ...row, [field]: value } : row));
  const remove = (index) => setRows(rows.filter((_, i) => i !== index));
  return (
    <div className="stack">
      <div className="section-title"><h3>{title}</h3><Button variant="secondary" type="button" onClick={add}>Add</Button></div>
      {rows.map((row, index) => (
        <div className="inline-grid" key={index}>
          {fields.map((field) => field === "description" ? <Textarea key={field} placeholder={field} value={row[field]} onChange={(event) => update(index, field, event.target.value)} /> : <Input key={field} placeholder={field} value={row[field]} onChange={(event) => update(index, field, event.target.value)} />)}
          <Button variant="ghost" type="button" onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
    </div>
  );
}
