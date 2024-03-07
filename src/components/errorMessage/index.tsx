export const ErrorMessage = ({ error = "" }) => {
  return error && <p className="text-red-500 mt-2 mb-5 text-small">{error}</p>
}
