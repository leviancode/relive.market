
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

export const seedDevDatabase = async () => {
  const seedListings = [
    {
      title: 'Motorcycle Helmet',
      fileName: 'helmet.jpg',
      price: 25,
    },
    {
      title: 'Yoga Mat',
      fileName: 'yoga-mat.jpg',
      price: 10,
    },
    {
      title: 'Surfboard',
      fileName: 'surfboard.jpg',
      price: 40,
    },
    {
      title: 'Wooden Nightstand',
      fileName: 'nightstand.jpg',
      price: 15,
    },
  ];

  const listingsRef = collection(db, 'listings');

  // 1. Удаляем старые документы и связанные изображения
  const snapshot = await getDocs(listingsRef);
  for (const docSnap of snapshot.docs) {
    const listingId = docSnap.id;

    // Удаление из Firestore
    await deleteDoc(doc(db, 'listings', listingId));

    // Удаление изображений из Storage
    const dirRef = ref(storage, `listings/${listingId}`);
    try {
      const list = await listAll(dirRef);
      for (const fileRef of list.items) {
        await deleteObject(fileRef);
      }
    } catch (e) {
      console.warn(`No images to delete for listing ${listingId}`);
    }
  }

  // 2. Создание новых данных
  for (const item of seedListings) {
    try {
      const filePath = `images/${item.fileName}`;
      const response = await fetch(filePath);
      const blob = await response.blob();

      const docRef = await addDoc(listingsRef, {
        title: item.title,
        price: item.price,
        currency: 'USD',
        condition: 'used',
        location: {
          lat: -8.4095,
          lng: 115.1889,
          country: 'Indonesia',
          region: 'Bali',
          city: 'Ubud'
        },
        category: 'Other',
        tags: ['test'],
        status: 'published',
        createdAt: Date.now(),
        images: [],
      });

      const imageRef = ref(storage, `listings/${docRef.id}/0.jpg`);
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'listings', docRef.id), {
        images: [imageUrl],
      });

      console.log(`✅ Seeded listing: ${item.title}`);
    } catch (error) {
      console.error(`❌ Failed to seed listing: ${item.title}`, error);
    }
  }
};
