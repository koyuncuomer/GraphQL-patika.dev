# GraphQL-patika.dev
## Ödev 1
Kullanıcılar, etkinlikler, etkinliklerin yapılacağı konum ve etkinlik katılımcılarını size sağlanan veri seti üzerinden görüntüleyebilecek bir GraphQL sunucu oluşturmanız gerekiyor.

## Gereksinimler
- [Şuradaki](https://github.com/Kodluyoruz/taskforce/blob/main/graphql/odev-01/data.json) veri seti kullanılarak bir GraphQL sunucusu ayağa kaldırılmalıdır.
- Temel olarak User, Event, Location ve Participant tiplerini oluşturmalısınız. Bu tiplerle alakalı fieldları veri seti üzerinden görüntüleyebilirsiniz.
- Bir User'a ait bir veya birden fazla Event olabilir.
- Bir Event, bir User ile ilişkili olmalıdır.
- Bir Event, bir Location ile ilişkili olmalıdır.
- Bir Event birden fazla Participant ile ilişkili olmalıdır.
- Tüm tipler üzerinde tümünü listeleme ve id bazlı bir kaydı getirme Query'leri yazılmalıdır.

## Örnek Query'ler
```
query getEvents {
  events {
    id
    title
    date
    user {
      id
      username
    }
    location {
      id
      name
    }
    participants {
      id
      event_id
      user_id
      user {
        id
        username
      }
    }
  }
}

query getEvent {
  event(id: 10) {
    id
    title
    date
    user {
      id
      username
    }
    location {
      id
      name
    }
    participants {
      id
      event_id
      user_id
      user {
        id
        username
      }
    }
  }
}

query getUsers {
  users {
    id
    username
  }
}

query getUser {
  user(id: 10) {
    id
    username
  }
}

query getLocations {
  locations {
    id
    name
  }
}

query getLocation {
  location(id: 10) {
    id
    name
  }
}
```