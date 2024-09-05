function Intro() {
  return (
    <div className="flex-1 relative bg-cover bg-right bg-[url('/Kreator-Studios-AAYLF2019-244-scaled.jpg')]">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      <div className="z-20 relative h-full px-12 flex flex-col justify-center gap-6">
        <h1 className="text-5xl text-white font-bold">
          Learn, Engage and Connect.
        </h1>
        <p className="text-xl text-white">
          The leading organisation for promoting partnership between ASEAN and
          Australian youth.
        </p>
      </div>
    </div>
  );
}

export default Intro;
