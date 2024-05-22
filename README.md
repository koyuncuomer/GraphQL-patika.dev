# GraphQL-patika.dev
# Ödev 1
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
---
# Ödev 2
Bu ödevde göreviniz, tüm tiplerle alakalı oluşturma, güncelleme, silme ve tümünü silme Mutation'larını hazırlamak olacak.

## Gereksinimler
- Yeni bir User ekleyecek Mutation yazılmalıdır.
- Bir User'ı güncelleyecek olan Mutation yazılmalıdır.
- Bir User'ı silecek olan Mutation yazılmalıdır.
- Tüm User'ları silecek olan Mutation yazılmalıdır.
- Yukarıdaki maddeler Event, Location ve Participant için de uygulanmalıdır.

## Örnek Query'ler
```
mutation createEvent {
  createEvent(
    data: {
      title: "Mutation ile eklenen event"
      desc: "Mutation ile eklenen event desc"
      date: "2023-01-01"
      from: "10:00"
      to: "11:00"
      location_id: 1
      user_id: 1
    }
  ) {
    id
    title
  }
}

mutation updateEvent {
  updateEvent(
    id: 1
    data: {
      title: "Updated title"
      date: "2023-01-01"
      desc: "Lorem ipsum"
      user_id: 2
    }
  ) {
    id
    title
    date
    user {
      id
      username
    }
  }
}

mutation deleteEvent {
  deleteEvent(id: 1) {
    id
    title
  }
}

mutation deleteAllEvents {
  deleteAllEvents {
    count
  }
}

mutation cretaLocation {
  createLocation(
    data: {
      name: "Mutation location"
      desc: "Mutation location desc"
      lat: 1.1
      lng: 1.2
    }
  ) {
    id
    name
  }
}

mutation updateLocation {
  updateLocation(
    id: 1
    data: {
      name: "Mutation location updated"
      desc: "Mutation location desc updated"
    }
  ) {
    id
    name
  }
}

mutation deleteLocation {
  deleteLocation(id: 1) {
    id
    name
  }
}

mutation deleteAllLocations {
  deleteAllLocations {
    count
  }
}

mutation createUser {
  createUser(data: { username: "Omer Koyuncu", email: "omer@koyuncu" }) {
    id
    email
  }
}

mutation createParticipant {
  createParticipant(data: { user_id: 1, event_id: 1 }) {
    id
    user {
      username
    }
  }
}

mutation deleteParticipant {
  deleteParticipant(id: 1) {
    id
  }
}

```