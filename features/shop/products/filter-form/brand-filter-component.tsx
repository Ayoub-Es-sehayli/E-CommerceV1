export default function BrandFilter() {
  return (
    <section>
      <h4>Marques</h4>
      <div className="flex flex-col">
        <label>
          <input type="checkbox" name="brand" className="mx-2" />
          CeraVe <span className="text-primary-200">[1]</span>
        </label>
        <label>
          <input type="checkbox" name="brand" className="mx-2" />
          La Roche Posay <span className="text-primary-200">[1]</span>
        </label>
      </div>
    </section>
  );
}
