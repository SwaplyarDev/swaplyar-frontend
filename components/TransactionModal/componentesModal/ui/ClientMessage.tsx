interface ClientMessageProps {
  message: string;
  headerMessage: string;
  classnames?: string;
}

const ClientMessage: React.FC<ClientMessageProps> = ({ message, headerMessage, classnames }) => {
  return (
    <section className="flex flex-col pb-3 text-left">
      <p className="pl-5 font-textFont text-base font-semibold">{headerMessage}</p>
      <article className={`w-[100%] rounded-lg border-[1px] p-2 ${classnames} `}>
        <p>{message}</p>
      </article>
    </section>
  );
};

export default ClientMessage;
