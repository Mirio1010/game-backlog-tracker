const Wishlist = () => {
    return (
      <section>
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Wishlist
          </h1>
          <p className="mt-2 text-white/50">
            This section is still a work in progress.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl sm:p-6">
          <img
            src="https://as2.ftcdn.net/v2/jpg/18/62/14/57/1000_F_1862145722_HSpXDQ4efmMPl5oxXYQ9hoJLsKD3eMBA.jpg"
            alt="Wishlist work in progress"
            className="mx-auto max-h-[60vh] w-full max-w-3xl rounded-xl object-contain"
          />
        </div>
      </section>
    );
}

export default Wishlist;
