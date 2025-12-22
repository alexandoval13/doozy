export interface ListItem {
  id: string;
  title: string;
}

export interface ListProps {
  data: ListItem[];

  handleMarkComplete: (id: string) => void;
  handleDelete: (id: string) => void;
}

export default function List(props: ListProps) {
  const { data, handleMarkComplete, handleDelete } = props;

  return (
    <ul style={{ padding: '0 24px' }}>
      {data.map((d: ListItem) => (
        <li
          key={d.id}
          style={{
            display: 'flex ',
            justifyContent: 'space-between',
          }}
        >
          <p>{d.title}</p>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => handleMarkComplete(d.id)}>✓</button>
            <button onClick={() => handleDelete(d.id)}>x</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
