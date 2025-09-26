export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary-50">
      <div className="flex flex-col items-center gap-4 text-secondary-600">
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        <p className="text-sm font-medium">Loading experience&hellip;</p>
      </div>
    </div>
  );
}
