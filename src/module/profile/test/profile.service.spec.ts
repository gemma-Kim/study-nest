// import * as faker from 'faker';
// import { NotFoundException } from '@nestjs/common';
// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { User } from 'src/module/user/entity/user.entity';
// import { UserRepository } from 'src/module/user/repository/user.reposiory';
// import { Profile } from '../entity/profile.entity';
// import { ProfileController } from '../application/profile.controller';
// import { ProfileService } from '../application/profile.service';
// import { ProfileRepository } from '../repository/profile.repository';

// let service: ProfileService;
// let profileRepository: ProfileRepository;
// const mockProfileRepository = () => ({
//   save: jest.fn(),
//   findOne: jest.fn(),
//   find: jest.fn(),
// });
// let userRepository: UserRepository;
// const mockUserRepository = () => ({
//   save: jest.fn(),
//   findOne: jest.fn(),
//   find: jest.fn(),
// });

// beforeEach(async () => {
//   const module: TestingModule = await Test.createTestingModule({
//     controllers: [ProfileController],
//     providers: [
//       ProfileService,
//       ProfileRepository,
//       UserRepository,
//       { provide: getRepositoryToken(User), useValue: mockUserRepository() },
//       {
//         provide: getRepositoryToken(Profile),
//         useValue: mockProfileRepository(),
//       },
//     ],
//   }).compile();

//   service = module.get<ProfileService>(ProfileService);
//   userRepository = module.get<UserRepository>(UserRepository);
//   profileRepository = module.get<ProfileRepository>(ProfileRepository);
// });

// describe('ProfileService', () => {
//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should be getUserProfile method in ProfileService', () => {
//     expect(service.getProfile).toBeDefined();
//   });

//   it('should be getUserProfile method in ProfileService', () => {
//     expect(service.getProfile).toBeDefined();
//   });

//   it('should be addNewProfile method in ProfileService', () => {
//     expect(service.addNewProfile).toBeDefined();
//   });

//   it('should be updateUserProfile method in ProfileService', () => {
//     expect(service.updateUserProfile).toBeDefined();
//   });
// });

// describe('getUserProfile', () => {
//   it('should be throw 404 HTTP Exception', async () => {
//     const userId: number = faker.datatype.number();
//     jest.spyOn(userRepository, 'findUser').mockReturnValue(null);
//     jest.spyOn(service, 'getProfile');

//     try {
//       await service.getProfile(userId);
//     } catch (err) {
//       expect(err).toEqual(new NotFoundException());
//     }
//   });
// });

// describe('addNewProfile', () => {
//   let id: number;
//   let userId: number;
//   let gender: 'WOMAN' | 'MAN';
//   let photo: string;
//   let mockResult;
//   beforeEach(() => {
//     id = faker.datatype.number();
//     userId = faker.datatype.number();
//     gender = faker.random.arrayElement(['WOMAN', 'MAN']);
//     photo = faker.datatype.string();
//     mockResult = { id, userId, gender, photo };
//   });
//   it('should call save method of profileRepository', async () => {
//     const mockAddNewProfile = jest
//       .spyOn(profileRepository, 'addNewProfile')
//       .mockResolvedValue(mockResult);

//     await profileRepository.addNewProfile(mockResult);

//     expect(mockAddNewProfile).toHaveBeenCalledTimes(1);
//     expect(mockAddNewProfile).toHaveBeenCalled();
//   });

//   it('should return RIGHT OBJECT', async () => {
//     jest
//       .spyOn(profileRepository, 'addNewProfile')
//       .mockResolvedValue(mockResult);

//     jest.spyOn(service, 'addNewProfile');
//     const result = await service.addNewProfile(userId, mockResult);
//     expect(result).toEqual(mockResult);
//     expect(result).toHaveProperty('id');
//     expect(result).toHaveProperty('userId');
//     expect(result).toHaveProperty('gender');
//     expect(result).toHaveProperty('photo');
//   });
// });

// describe('updateUserProfile', () => {
//   let id: number;
//   let userId: number;
//   let gender: 'WOMAN' | 'MAN';
//   let photo: string;
//   let mockResult;
//   beforeEach(() => {
//     id = faker.datatype.number();
//     userId = faker.datatype.number();
//     gender = faker.random.arrayElement(['WOMAN', 'MAN']);
//     photo = faker.datatype.string();
//     mockResult = { id, userId, gender, photo };
//   });
//   it('should call updateProfile method of profileRepository', async () => {
//     const mockUpdateProfile = jest
//       .spyOn(profileRepository, 'addNewProfile')
//       .mockResolvedValue(mockResult);

//     jest.spyOn(userRepository, 'saveUser').mockResolvedValue(mockResult);

//     await service.updateUserProfile(1, mockResult);

//     expect(mockUpdateProfile).toHaveBeenCalled();
//   });

//   it('should call saveUser method of userRepository', async () => {
//     const mockSaveUser = jest
//       .spyOn(userRepository, 'saveUser')
//       .mockResolvedValue(mockResult);

//     jest
//       .spyOn(profileRepository, 'addNewProfile')
//       .mockResolvedValue(mockResult);

//     await service.updateUserProfile(1, mockResult);

//     expect(mockSaveUser).toHaveBeenCalled();
//   });

//   it('should not call saveUser method and updateProfile method', async () => {
//     const userId = null;
//     const mockSaveUser = jest.spyOn(userRepository, 'saveUser');
//     const mockUpdateProfile = jest.spyOn(profileRepository, 'addNewProfile');

//     jest.spyOn(service, 'updateUserProfile');

//     // await service.updateUserProfile({ userId }).catch(() => {
//     //   expect(mockSaveUser).not.toHaveBeenCalled();
//     //   expect(mockUpdateProfile).not.toHaveBeenCalled();
//     // });
//   });

//   it('should not call updateProfile of profileRepository when saveUser method happends error', async () => {
//     jest.spyOn(userRepository, 'saveUser').mockRejectedValue(new Error());
//     jest.spyOn(service, 'updateUserProfile');

//     const mockUpdateProfileRepo = jest.spyOn(
//       profileRepository,
//       'updateProfile',
//     );

//     await service.updateUserProfile(1, mockResult).catch((result) => {
//       expect(mockUpdateProfileRepo).not.toHaveBeenCalled();
//     });
//   });
// });
