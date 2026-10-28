type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

/** Standard page section: consistent gutters and vertical rhythm. */
export default function Section({ id, children, className = "" }: Props) {
  return (
    <section id={id} className={`relative px-5 py-28 sm:px-10 sm:py-40 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
