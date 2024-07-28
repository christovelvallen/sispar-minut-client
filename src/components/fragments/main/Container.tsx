type PropsType = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ className, children }: PropsType) {
  return (
    <div className={className}>
      <div className="w-full max-w-6xl mx-auto">{children}</div>
    </div>
  );
}
