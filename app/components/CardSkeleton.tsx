export default function CardSkeleton() {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg bg-gray-100 px-2.5 py-2">
      <div className="h-8 w-8 rounded-full bg-gray-200" />
      <div className="flex flex-1 flex-col justify-around gap-2">
        <div className="h-1 rounded-md bg-gray-200" />
        <div className="h-1 rounded-md bg-gray-200" />
        <div className="h-1 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
