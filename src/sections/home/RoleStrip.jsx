/** The five roles as ticks on one dimension line: one drawing, shared by all of them. */
export default function RoleStrip() {
  const roles = ['Engineering', 'Suppliers', 'Customers', 'Production', 'Quality'];
  return (
    <div className="role-strip">
      <div className="container role-strip__inner">
        <p className="role-strip__title">One drawing. Shared context.</p>
        <ul className="role-strip__line">
          {roles.map((r) => <li key={r}><span className="role-strip__tick" aria-hidden="true" />{r}</li>)}
        </ul>
      </div>
    </div>
  );
}
