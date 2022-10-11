export default function CategoryFilter() {
  return (
    <section>
      <h4>Categories</h4>
      <div className="flex flex-col">
        <label>
          <input type="radio" name="category" className="mx-2" />
          Visage <span className="text-primary-200">[1]</span>
        </label>
      </div>
    </section>
  );
}
