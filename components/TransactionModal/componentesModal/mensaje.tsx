export default function Mensaje() {
  return (
    <article className="flex h-[69px] flex-col items-start justify-start">
      <p className="text-[8px] font-medium text-custom-grayD">Mensaje</p>

      <label className="flex h-[59px] w-[812px] items-center overflow-hidden rounded-lg border border-custom-blue-800 px-3">
        <article className="absolute left-[12px] top-[3px] h-[0px] w-2.5 origin-top-left rotate-[143.13deg] border"></article>
        <article className="absolute left-[12px] top-0 h-[0px] w-[15px] origin-top-left rotate-[143.13deg] border"></article>
        <input
          className="h-full w-full border-none outline-none focus:border-transparent focus:ring-0"
          placeholder="Se realizó la modificación solicitada por el cliente con éxito."
          type="text"
        />
      </label>
    </article>
  );
}
