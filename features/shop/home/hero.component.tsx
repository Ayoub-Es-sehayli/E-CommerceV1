export function Hero() {
  return (
    <div className="flex flex-col md:flex-row md:justify-around gap-1 divide-y divide-black md:divide-none px-3 py-6 rounded-2xl font-serif font-bold text-2xl text-primary-600">
      <div className="flex flex-col items-center">
        <i className="bi bi-truck text-2xl" />
        <p className="text-primary-600">Livraison à domicile</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-primary-600">Retrouvez vos produits ici</p>
        <p className="font-sans text-xl text-primary-400">
          Be That person with us
        </p>
      </div>
    </div>
  );
}
