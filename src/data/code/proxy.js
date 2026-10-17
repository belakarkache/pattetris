function reactive(target, onChange) {
  return new Proxy(target, {
    set(object, key, value) {
      const previous = object[key];
      object[key] = value;
      if (previous !== value) onChange(key, value, previous);
      return true;
    },
  });
}

function readOnly(target) {
  return new Proxy(target, {
    set(_, key) {
      throw new Error(`"${String(key)}" é somente leitura`);
    },
  });
}

const stats = reactive({ score: 0, lines: 0 }, (key, value) => {
  console.log(`${key} mudou para ${value}`);
});

stats.score += 300;
stats.lines += 2;

const rules = readOnly({ columns: 10, rows: 20 });

try {
  rules.columns = 12;
} catch (error) {
  console.log(error.message);
}
