export const addDisableToProps = (list: string[]) => {
  return list.reduce((acc, p) => {
    acc[p] = {
      table: {
        disable: true,
      },
    }
    return acc;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as any);
}