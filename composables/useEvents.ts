// Lädt Events zur Laufzeit aus /public/content/events.json (von Florian gepflegt)
// und filtert automatisch die kommenden Termine. Vergangene fallen von selbst raus.
export function useEvents() {
  const events = useState<any[]>('events', () => [])
  const loaded = useState<boolean>('events_loaded', () => false)

  async function load() {
    try {
      const data = await $fetch<any[]>('/content/events.json', { cache: 'no-cache' })
      events.value = Array.isArray(data) ? data : []
    } catch (e) {
      events.value = []
    } finally {
      loaded.value = true
    }
  }

  const upcoming = computed(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return [...events.value]
      .filter(e => new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  })

  // Die nächsten zwei Termine für die Vorschau
  const next2 = computed(() => upcoming.value.slice(0, 2))

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleString('de-AT', {
        weekday: 'long', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'
      }) + ' Uhr'
    } catch { return iso }
  }

  return { events, loaded, load, upcoming, next2, formatDate }
}
