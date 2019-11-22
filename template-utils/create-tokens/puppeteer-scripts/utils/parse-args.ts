export function parseArgs(
  args: string[],
): { user: string; url: string; pass: string } {
  const newArgs = args.slice(2);
  if (newArgs.length < 3) {
    console.log(
      `Invalid arguments. Usage: ${args[0]} ${args[1]} <url> <username> <password>`,
    );
  }
  return { url: newArgs[0], user: newArgs[1], pass: newArgs[2] };
}
